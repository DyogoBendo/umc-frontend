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
      render={({ field, fieldState }) => {
        if (fieldState.error) {
          console.log("ERRO NO CONTEST:", fieldState.error);
        }
        return (        
        <Autocomplete
          freeSolo 
          options={options}
          loading={loading}
          value={field.value}
          isOptionEqualToValue={(option, value) => {
            if (option.id && value.id) {
               return option.id === value.id;
            }            
            return (option.name || option.title) === (value.name || value.title);
          }}
          blurOnSelect
          onBlur={(event) => {
            field.onBlur();
            const textValue = (event.target as HTMLInputElement).value;
            if (textValue && (!field.value || field.value.title !== textValue)) {      
              field.onChange({
                title: textValue,                
                id: null,                
              });
            }
          }}
          onChange={(_, newValue) => {
            if (typeof newValue === "string") {              
              field.onChange({
                title: newValue,                
                id: null,                
              });
            } else {
              field.onChange(newValue);
            }
          }}
          getOptionLabel={(option) => {
            if (typeof option === "string") return option;
            if (option && option.title) return option.title;
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
      )}}
    />
  );
}