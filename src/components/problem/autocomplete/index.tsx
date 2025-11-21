import { Autocomplete, TextField, CircularProgress } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { useEffect, useState } from "react";
import problemService from "../../../services/problemService";
import type { Problem } from "../../../schemas/entities/problem";

// Props para saber QUEM sou eu e QUEM é meu par
interface ProblemAutocompleteProps {
  name: string;              // Ex: "attempts.0.problem"
  problemSetFieldName: string; // Ex: "attempts.0.problemSet"
}

export default function ProblemAutocomplete({ name, problemSetFieldName }: ProblemAutocompleteProps) {
  const { control, setValue } = useFormContext();
  const [options, setOptions] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(false);

  // 1. Carrega TODOS os problemas (sem filtro de set)
  useEffect(() => {
    const loadProblems = async () => {
      setLoading(true);
      // Removemos o filtro { problemSetName: ... }
      const problems = await problemService.getAll(); 
      setOptions(problems);
      setLoading(false);
    };
    loadProblems();
  }, []); // Roda apenas uma vez na montagem

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Autocomplete
          freeSolo
          options={options}
          loading={loading}
          value={field.value}
          
          // Lógica para renderizar o Label corretamente
          getOptionLabel={(option) => {
            if (typeof option === "string") return option;
            if (option && option.title) return option.title;
            return "";
          }}

          // --- A MÁGICA ACONTECE AQUI ---
          onChange={(_, newValue) => {
            // 1. Primeiro, atualiza o próprio campo Problem
            if (typeof newValue === "string") {
              // Caso: Digitou um nome novo
              field.onChange({
                title: newValue,
                id: null,
                problemSet: null // Não sabemos o set, deixa nulo (usuário preenche manual)
              });
              
              // Opcional: Se quiser limpar o set quando digita um nome novo:
              // setValue(problemSetFieldName, null); 

            } else if (newValue) {
              // Caso: Selecionou um problema da lista
              field.onChange(newValue);

              // 2. EFEITO COLATERAL: Tenta preencher o Problem Set automaticamente
              if (newValue.problemSet) {
                // Se o problema selecionado JÁ tem um set, preenchemos o campo vizinho
                setValue(problemSetFieldName, newValue.problemSet, { 
                    shouldValidate: true, 
                    shouldDirty: true 
                });
              } else {
                  // Se o problema não tem set, podemos limpar o campo vizinho 
                  // para forçar o usuário a escolher um
                  // setValue(problemSetFieldName, null);
              }

            } else {
              // Caso: Limpou o campo problem
              field.onChange(null);
              // Opcional: Limpar o set também?
              // setValue(problemSetFieldName, null);
            }
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