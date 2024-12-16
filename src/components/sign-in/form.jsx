import { Button, Input } from "@nextui-org/react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import styles from "./form.module.css"
import { useNavigate } from "react-router-dom"
import { checkIfStudentEmailExists, createUser } from "../../firebase"
import SchoolAutoComplete from "../../components/school/autocomplete"
// import { usePathname, useRouter, useSearchParams } from "next/navigation"
export default function SignInFormComponent() {
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    control
  } = useForm()
  //  const searchParams = useSearchParams()
  //  const pathName = usePathname()
  //  const router = useRouter()
  const [state, setState] = useState({})
  const navigate = useNavigate()
  
  const onSubmit = async (formData) => {
    setState({})

    const userCreate = {
      name: formData.name,
      email: formData.email,
      grade: formData.grade,
      school: formData.school,
      role: "student",
    }


    const exists = await checkIfStudentEmailExists(formData.email)
    if (exists) {
      setState({ error: "Student Email Already Exists" })


      setTimeout(() => {
        setState({ error: null }) // Set the error back to null or an empty state
      }, 2000)
    }
    else {
       const user = await createUser({ userCreate })
       console.log("mika singh", user)
       if (!user) {
         setState({ success: true })
       } else {
         setState(user)
       }
       navigate(
         `/video?grade=${user.grade}&user=${user.id}&school=${formData.school}`
       )
  
    }
    // const params = new URLSearchParams(searchParams)
    
   }

  return (
    <form className={styles.signInForm} onSubmit={handleSubmit(onSubmit)}>
      {state?.error && <div className="error">{state.error}</div>}
      <div className={styles.inputWrapper}>
        <Input
          errorMessage={errors.name && "Please enter your Name"}
          isInvalid={!!errors.name}
          label={"Student Name"}
          labelPlacement={"outside"}
          placeholder={"Enter your Name"}
          radius={"sm"}
          {...register("name", { required: true })}
          type={"text"}
          variant={"bordered"}
        />
      </div>
      <div className={styles.inputWrapper}>
        <Input
          errorMessage={errors.email && "Please enter your Email"}
          isInvalid={!!errors.email}
          label={"Student Email"}
          labelPlacement={"outside"}
          placeholder={"Enter your Email"}
          radius={"sm"}
          {...register("email", { required: true })}
          type={"text"}
          variant={"bordered"}
        />
      </div>
      <div className={styles.inputWrapper}>
        <Input

          errorMessage={errors.grade && "Please enter your Grade"}
          isInvalid={!!errors.grade}
          label={"Student Grade"}
          labelPlacement={"outside"}
          placeholder={"Enter your Grade"}
          radius={"sm"}
          {...register("grade", { required: true })}
          type={"number"}
          max={10}
          variant={"bordered"}
        />
      </div>
      <div className={styles.inputWrapper}>
        {/* <Input

          errorMessage={errors.SchoolName && "Please enter your School Name"}
          isInvalid={!!errors.SchoolName}
          label={"Student School Name"}
          labelPlacement={"outside"}
          placeholder={"Enter your School Name"}
          radius={"sm"}
          {...register("SchoolName", { required: true })}
          type={"text"}
          variant={"bordered"}
        /> */}
        <SchoolAutoComplete
          control={control}
          errors={errors}
          register={register}
          school={""}
        />
      </div>
      <div className={styles.signInOptions}></div>
      <div className={styles.signInButtonWrapper}>
        <Button
          className={styles.signInButton}
          color={"primary"}


          isLoading={isSubmitting}
          radius={"sm"}
          type={"submit"}
          onClick={() => {}}
        >
          Proceed To Video
        </Button>
      </div>
    </form>
  )
}
