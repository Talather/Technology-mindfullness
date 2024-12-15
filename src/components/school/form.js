'use client';

import DashboardContext from '@/components/dashboard/context';
import { QuestionProvider } from '@/components/survey/question.context';
import TopicAutocompleteComponent from '@/components/topic/autocomplete';
import { createSchool, updateSchool } from '@/lib/form-actions/school';
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './form.module.css';

import useAuthUser from "@/components/useAuth/code"
export default function SchoolFormComponent({ school = {}, update = false }) {
  const { control, formState: { errors, isSubmitting }, handleSubmit, register } = useForm();
  const router = useRouter();
  const [state, setState] = useState({});
  const { setSuccess } = useContext(DashboardContext);
  const { user, loading } = useAuthUser()
  const onSubmit = async (formData) => {
    
    formData.user = user?.uid
    setState({});
    const action = update ? updateSchool : createSchool;
    
    const response = await action({ id: school.id }, formData);
    setState(response);
  };

  useEffect(() => {
    if (state.success) {
      setSuccess(state.success);
      router.back();
    }
  }, [router, setSuccess, state]);

  return (
    <Modal
      backdrop={"blur"}
      isOpen={true}
      size={"3xl"}
      onClose={() => router.back()}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalContent>
          <ModalHeader>{update ? "Update " : "Create "}School</ModalHeader>
          <ModalBody>
            {state?.error && <div className="error">{state.error}</div>}
            <div className={styles.formWrapper}>
              <div className={styles.formElementsWrapper}>
                {/* <QuestionProvider>
                  <TopicAutocompleteComponent control={control} errors={errors} register={register}
                    topic={school.topic} />
                </QuestionProvider> */}
                <Input
                  defaultValue={school.name}
                  errorMessage={
                    !!errors.name && "Please provide the school name"
                  }
                  isInvalid={!!errors.name}
                  label={"School Name"}
                  labelPlacement={"outside"}
                  radius={"sm"}
                  {...register("name", { required: true })}
                  type={"text"}
                  variant={"bordered"}
                />

                <Input
                  defaultValue={school.email}
                  errorMessage={
                    !!errors.name && "Please provide the school email"
                  }
                  isInvalid={!!errors.email}
                  label={"School Email"}
                  labelPlacement={"outside"}
                  radius={"sm"}
                  {...register("email", { required: true })}
                  type={"text"}
                  variant={"bordered"}
                />
              </div>

              <div className={styles.formElementsWrapper}>
                {/* <QuestionProvider>
                  <TopicAutocompleteComponent control={control} errors={errors} register={register}
                    topic={school.topic} />
                </QuestionProvider> */}
                <Input
                  defaultValue={school.contactDetails}
                  errorMessage={
                    !!errors.contactDetails &&
                    "Please provide the school contact details"
                  }
                  isInvalid={!!errors.contactDetails}
                  label={"Contact Details"}
                  labelPlacement={"outside"}
                  radius={"sm"}
                  {...register("contactDetails", { required: true })}
                  type={"text"}
                  variant={"bordered"}
                />

                <Input
                  defaultValue={school.address}
                  errorMessage={
                    !!errors.address && "Please provide the school address"
                  }
                  isInvalid={!!errors.address}
                  label={"School Address"}
                  labelPlacement={"outside"}
                  radius={"sm"}
                  {...register("address", { required: true })}
                  type={"text"}
                  variant={"bordered"}
                />
              </div>

              <div className={styles.formElementsWrapper}>
                {/* <QuestionProvider>
                  <TopicAutocompleteComponent control={control} errors={errors} register={register}
                    topic={school.topic} />
                </QuestionProvider> */}
                <Input
                  defaultValue={school.country}
                  errorMessage={
                    !!errors.country && "Please provide the school country"
                  }
                  isInvalid={!!errors.country}
                  label={"Country Name"}
                  labelPlacement={"outside"}
                  radius={"sm"}
                  {...register("country", { required: true })}
                  type={"text"}
                  variant={"bordered"}
                />

                <Input
                  defaultValue={school.maxGradeLevel}
                  errorMessage={
                    !!errors.maxGradeLevel &&
                    "Please provide the school maxGradeLevel"
                  }
                  isInvalid={!!errors.maxGradeLevel}
                  label={"School Max Grade Level"}
                  labelPlacement={"outside"}
                  radius={"sm"}
                  {...register("maxGradeLevel", { required: true })}
                  type={"text"}
                  variant={"bordered"}
                />
              </div>

              <div className={styles.formElementsWrapper}>
                {/* <QuestionProvider>
                  <TopicAutocompleteComponent control={control} errors={errors} register={register}
                    topic={school.topic} />
                </QuestionProvider> */}






                {/* <Input
                  defaultValue={school.logo}
                  errorMessage={
                    !!errors.logo && "Please provide the school logo"
                  }
                  isInvalid={!!errors.logo}
                  label={"School logo"}
                  labelPlacement={"outside"}
                  radius={"sm"}
                  {...register("logo", { required: true })}
                  type={"text"}
                  variant={"bordered"}
                /> */}

                
              </div>
            </div>
          </ModalBody>
          <ModalFooter className={styles.footer}>
            <Button
              className={styles.footerButton}
              radius={"sm"}
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button
              className={styles.footerButton}
              color={"primary"}
              isDisabled={!!state?.success}
              isLoading={isSubmitting}
              radius={"sm"}
              type={"submit"}
            >
              {update ? "Update" : "Create"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  )
}
