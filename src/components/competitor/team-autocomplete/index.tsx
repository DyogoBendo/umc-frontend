import { Controller, useFormContext } from "react-hook-form";
import { Autocomplete, TextField, CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import competitorService from "../../../services/competitorService";
import type { Competitor } from "../../../schemas/entities/competitor";

export default function TeamAutocomplete() {
  // Pegue o control, assim como no outro componente
  const { control } = useFormContext();
  const [options, setOptions] = useState<Competitor[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadCompetitors = async () => {
      setLoading(true);
      const sets = await competitorService.getAll(); // Carrega os SETS
      setOptions(sets);
      setLoading(false);
    };
    loadCompetitors();
  }, []);

  return (
    <Controller
      name="team"
      control={control}
      render={({ field }) => (
          <Autocomplete          
          multiple
          options={options}
          loading={loading}
          value={field.value}          
          onChange={(_, newValue) => {            
              field.onChange(newValue);            
          }}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Team" // NOVO: Label
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