import { useEffect, useState } from "react";
import { TextField, CircularProgress, Autocomplete } from "@mui/material";
import problemService from "../../../services/problemService";
import type { Problem } from "../../../schemas/entities/problem";
import { Controller, useFormContext } from "react-hook-form";

export default function ProblemAutocomplete() {
    const { control, watch, setValue } = useFormContext();
    const [options, setOptions] = useState<Problem[]>([]);
    const [loading, setLoading] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const currentProblemSet = watch("problemSet");

    useEffect(() => {
        setValue("problem", null, { shouldValidate: true });        
        setInputValue("");
        const loadProblems = async () => {
            setLoading(true);            
            const problems = await problemService.getAll({"problemSetName": currentProblemSet?.name});
            setOptions(problems);
            setLoading(false);
        };

        loadProblems();
    }, [currentProblemSet, setValue]);    

  return (
    <Controller
      name="problem"
      control={control}
      render={({ field, fieldState }) => (
        <Autocomplete
          freeSolo
          key={currentProblemSet?.name || 'none'}
          options={options}
          loading={loading}
          value={field.value}
          inputValue={inputValue}
          onInputChange={(_, newInputValue, reason) => {                        
                        if (reason === 'input') {
                            setInputValue(newInputValue);
                        }
                        if (reason === 'clear') {
                            setInputValue("");
                        }
                    }}
          blurOnSelect
          onBlur={(event) => {
            field.onBlur();
            const textValue = inputValue;
            if (textValue && (!field.value || field.value.title !== textValue)) {
                            
              field.onChange({
                title: textValue,
                id: null,
                problemSet: currentProblemSet,
              });
            }
          }}
          onChange={(_, newValue) => {
                if (typeof newValue === 'string') {
                    // O usuário apertou Enter
                    setInputValue(newValue); // Sincroniza o state
                    field.onChange({
                        title: newValue,
                        id: null,
                        problemSet: currentProblemSet
                    });
                } else if (newValue) {
                    // O usuário selecionou um item
                    setInputValue(newValue.title); // Sincroniza o state
                    field.onChange(newValue);
                } else {
                    // O usuário limpou
                    setInputValue(""); // Sincroniza o state
                    field.onChange(null);
                }
        }}
          getOptionLabel={(option) => {
            if (typeof option === "string") {
              return option;
            }
            // Se for um objeto (da lista ou do RHF)
            if (option && option.title) {
              return option.title;
            }
            // Fallback para valor inicial (null)
            return "";
        }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Problem"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? <CircularProgress size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />
      )}
    />
  );
}
