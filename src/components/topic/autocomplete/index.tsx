import { useEffect, useState } from "react";
import { Autocomplete, TextField, CircularProgress, Chip } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import topicService from "../../../services/topicService";
import type { Topic } from "../../../schemas/entities/topic";

interface TopicAutocompleteProps {
  name?: string;
}

export default function TopicAutocomplete({ name = "topics"}: TopicAutocompleteProps) {
  const { control } = useFormContext();
  const [options, setOptions] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadTopics = async () => {
      setLoading(true);
      const data = await topicService.getAll();
      setOptions(data);
      setLoading(false);
    };
    loadTopics();
  }, []);

  return (
    <Controller
      name={name} // O nome deve bater com o schema
      control={control}
      render={({ field, fieldState }) => (
        <Autocomplete
          // 1. Habilita seleção múltipla
          multiple 
          
          // 2. Habilita criar novos (digitar texto livre)
          freeSolo 
          
          options={options}
          loading={loading}
          
          // Garante que o valor seja sempre um array
          value={field.value || []} 
          
          // Lógica para identificar se uma opção é igual a um valor selecionado
          isOptionEqualToValue={(option, value) => {
             // Se for um valor novo criado (id null), compara pelo nome
             if (value.id === null) return option.name === value.name;
             return option.id === value.id;
          }}

          getOptionLabel={(option) => {
            // Se for string (enquanto digita ou se o freeSolo falhar em converter)
            if (typeof option === "string") return option;
            // Se for objeto
            return option.name || "";
          }}

          // A MÁGICA ACONTECE AQUI NO ONCHANGE
          onChange={(_, newValue) => {
            // 'newValue' é um array que pode conter Objetos Topic OU Strings
            // Ex: [{id:1, name:'Graphs'}, "Nova Tag Digitada"]

            const normalizedValue = newValue.map((item) => {
              // Se o item for uma string (foi digitado e dado Enter)
              if (typeof item === "string") {
                return {
                  id: null,
                  name: item,
                };
              }
              // Se já for um objeto (foi selecionado da lista)
              return item;
            });

            // Atualiza o formulário com o array de objetos Topic limpo
            field.onChange(normalizedValue);
          }}

          renderTags={(value: readonly Topic[], getTagProps) =>
            value.map((option: Topic, index: number) => {
              const { key, ...tagProps } = getTagProps({ index });
              return (
                <Chip
                  key={key} 
                  label={option.name} 
                  {...tagProps} 
                />
              );
            })
          }

          renderInput={(params) => (
            <TextField
              {...params}
              label="Topics"
              placeholder="Select or create topics"
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
