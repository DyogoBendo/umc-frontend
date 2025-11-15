import { useForm, Controller, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { problemAttemptSchema } from "../../../schemas/entities/problemAttempt";
import ProblemService from "../../../services/problemService";
import PlatformService from "../../../services/platformService";
import ProblemAutocomplete from "../../problem/autocomplete";
import ProblemSetAutocomplete from "../../problem-set/autocomplete";
import { problemAttemptFormSchema } from "../../../schemas/forms/problemAttemptForm";
import PlatformAutocomplete from "../../platform/autocomplete";

export function ProblemAttemptForm() {

  // Keep the entire form object instead of destructuring
  const form = useForm({
    resolver: zodResolver(problemAttemptFormSchema),
    defaultValues: {
      problem: null,
      platform: null,
      competitor: null,     
      problemSet: null, 
      date: new Date()
    }
  });

  const { register, handleSubmit, formState: { errors } } = form;

  const onSubmit = (data: any) => {     
    console.log("oi");
    console.log("FORM:", data);
  };

  const onError = (errorList: any) => {
    console.warn("Validação falhou:", errorList);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, onError)}>
        <div>
          <ProblemSetAutocomplete/>
        </div>
        <div>
          <ProblemAutocomplete/>
        </div>
        <div>
          <PlatformAutocomplete/>
        </div>

        <button type="submit">Save</button>
      </form>
    </FormProvider>
  );
}