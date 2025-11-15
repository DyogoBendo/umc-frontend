import { Controller, useFormContext } from "react-hook-form";
import type { ProblemSet } from "../../../schemas/entities/problemSet";
import { Autocomplete, TextField, CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import problemSetService from "../../../services/problemSetService";

export default function ProblemSetAutocomplete() {
  // Pegue o control, assim como no outro componente
  const { control } = useFormContext();
  const [options, setOptions] = useState<ProblemSet[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadProblemSets = async () => {
      setLoading(true);
      const sets = await problemSetService.getAll(); // Carrega os SETS
      setOptions(sets);
      setLoading(false);
    };
    loadProblemSets();
  }, []);

  return (
    <Controller
      name="problemSet"
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
            if (textValue && (!field.value || field.value.name !== textValue)) {      
              field.onChange({
                name: textValue,
                id: null,                
              });
            }
          }}
          onChange={(_, newValue) => {
            if (typeof newValue === "string") {              
              field.onChange({
                name: newValue,
                id: null,                
              });
            } else {
              field.onChange(newValue);
            }
          }}
          getOptionLabel={(option) => {
            if (typeof option === "string") return option;
            if (option && option.name) return option.name;
            return "";
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Problem Set" // NOVO: Label
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