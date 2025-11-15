import { useEffect, useState } from "react";
import { TextField, CircularProgress, Autocomplete } from "@mui/material";
import problemService from "../../../services/problemService";
import type { Problem } from "../../../schemas/entities/problem";
import { Controller, useFormContext } from "react-hook-form";

export default function ProblemAutocomplete() {
    const { control, watch } = useFormContext();
    const [options, setOptions] = useState<Problem[]>([]);
    const [loading, setLoading] = useState(false);
    const currentProblemSet = watch("problemSet");

    useEffect(() => {
        const loadProblems = async () => {
            setLoading(true);            
            const problems = await problemService.getAll({"problemSetName": currentProblemSet?.name});
            setOptions(problems);
            setLoading(false);
        };

        loadProblems();
    }, [currentProblemSet]);    

  return (
    <Controller
      name="problem"
      control={control}
      render={({ field }) => (
        <Autocomplete
          freeSolo
          options={options}
          loading={loading}
          value={field.value}
          blurOnSelect
          onBlur={(event) => {
            field.onBlur();
            const textValue = (event.target as HTMLInputElement).value;
            if (textValue && (!field.value || field.value.title !== textValue)) {
                            
              field.onChange({
                title: textValue,
                id: null,
                problemSet: currentProblemSet,
              });
            }
          }}
          onChange={(_, newValue) => {
            console.log(typeof newValue)
            if(typeof newValue === 'string'){
                field.onChange({
                    title: newValue,
                    id: null,
                    problemSet: currentProblemSet
                })
            } else{                
                field.onChange(newValue)
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
