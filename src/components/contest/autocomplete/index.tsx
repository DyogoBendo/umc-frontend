import { Controller, useFormContext } from "react-hook-form";
import { Autocomplete, TextField, CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import contestService from "../../../services/contestService";
import type { Contest } from "../../../schemas/entities/contest";

export default function ContestAutocomplete() {
  // Pegue o control, assim como no outro componente
  const { control } = useFormContext();
  const [options, setOptions] = useState<Contest[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadContests = async () => {
      setLoading(true);
      const sets = await contestService.getAll(); // Carrega os SETS
      setOptions(sets);
      setLoading(false);
    };
    loadContests();
  }, []);

  return (
    <Controller
      name="contest"
      control={control}
      render={({ field, fieldState }) => (
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
                link: null,
                id: null,                
              });
            }
          }}
          onChange={(_, newValue) => {
            if (typeof newValue === "string") {              
              field.onChange({
                name: newValue,
                link: null,
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
              label="Contest" // NOVO: Label
              error={!!fieldState.error} // <--- MUDANÇA AQUI
              helperText={fieldState.error?.message} // <--- MUDANÇA AQUI
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