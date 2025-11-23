import { Controller, useFormContext } from "react-hook-form";
import { Autocomplete, TextField, CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import entryTypeService from "../../../services/entryTypeService";
import type { EntryType } from "../../../schemas/entities/entryType";

interface EntryTypeAutocompleteProps {
  isFromContest?: boolean;
}

export default function EntryTypeAutocomplete({isFromContest} : EntryTypeAutocompleteProps) {
  // Pegue o control, assim como no outro componente
  const { control } = useFormContext();
  const [options, setOptions] = useState<EntryType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadEntryTypes = async () => {
      setLoading(true);
      const sets = await entryTypeService.getAll({"fromContest": isFromContest}); // Carrega os SETS
      console.log("entry", sets);
      setOptions(sets);
      setLoading(false);
    };
    loadEntryTypes();
  }, [isFromContest]);

  return (
    <Controller
      name="entryType"
      control={control}
      render={({ field }) => (
        <Autocomplete          
          options={options}
          loading={loading}
          value={field.value}          
          onChange={(_, newValue) => {            
              field.onChange(newValue);            
          }}
          isOptionEqualToValue={(option, value) => option?.id === value?.id}
          getOptionLabel={(option) => option.name || ""}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Tipo de entrada" // NOVO: Label
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