// src/components/entry-type/unique-autocomplete.tsx
import { Controller, useFormContext } from "react-hook-form";
import { Autocomplete, TextField, CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import entryTypeService from "../../../services/entryTypeService";
import type { EntryType } from "../../../schemas/entities/entryType";

interface UniqueEntryTypeAutocompleteProps {
  name: string;
  excludeIds?: number[]; // Lista de IDs para esconder
}

export default function UniqueEntryTypeAutocomplete({ name, excludeIds = [] }: UniqueEntryTypeAutocompleteProps) {
  const { control } = useFormContext();
  const [options, setOptions] = useState<EntryType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadEntryTypes = async () => {
      setLoading(true);
      // Busca todos (você pode filtrar por isFromContest se precisar)
      const allTypes = await entryTypeService.getAll();
      setOptions(allTypes);
      setLoading(false);
    };
    loadEntryTypes();
  }, []);

  // Filtra as opções localmente
  const filteredOptions = options.filter(opt => 
    // Mantém se o ID NÃO estiver na lista de exclusão
    !excludeIds.includes(opt.id as number) 
  );

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Autocomplete
          options={filteredOptions}
          loading={loading}
          
          // IMPORTANTE: O value atual deve ser exibido mesmo se estiver na lista de exclusão
          // (senão ele some quando você seleciona outro campo)
          value={field.value}          
          
          getOptionLabel={(option) => option.name || ""}
          isOptionEqualToValue={(option, value) => option.id === value?.id}
          
          onChange={(_, newValue) => {
            field.onChange(newValue);
          }}
          
          renderInput={(params) => (
            <TextField
              {...params}
              label="Tipo de Entrada"
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