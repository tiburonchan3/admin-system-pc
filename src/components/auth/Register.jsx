import { useRef, useState } from "react";
import { generateAdminCode } from "../../utils/regularExpression";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { EmployeeService } from "../../services/employe.service";

const Register = ({ setexistUser }) => {
  const emplService = new EmployeeService();
  const inputCode = useRef();
  const [codeVal, setCodeVal] = useState({
    value: "",
    error: true,
    errorMessage: "",
  });
  const setCode = () => {
    let val = inputCode.current.value;
    val = generateAdminCode();
    setCodeVal({ value: val, error: false });
  };
  const submit = (values) => {
    if (!codeVal.error) {
      const newValues = { ...values, code: codeVal.value };
      emplService.register(newValues).then((res) => {
        setexistUser(true);
      });
    } else {
      setCodeVal({ ...codeVal, message: "Este campo es obligatorio" });
    }
  };
  return (
    <Formik
      initialValues={defaultValues()}
      onSubmit={(fields) => submit(fields)}
      validationSchema={Yup.object().shape({
        nombre: Yup.string().required("El nombre es requerido"),
        apellido: Yup.string().required("El apellido es requerido"),
        password: Yup.string()
          .min(8, "La contraseña debe contener al menos 8 caracteres")
          .required("La contraseña es requerida"),
        repeatPassword: Yup.string()
          .oneOf(
            [Yup.ref("password"), null],
            "Las contraseñas deben ser iguales"
          )
          .required("Debes confirmar tu contraseña"),
      })}
    >
      {({ errors, touched }) => (
        <Form>
          <div className="login-container grid w-72 md:p-2 p-5 mr-8 md:mt-16">
            <p className="text-gray-100 font-semibold text-md uppercase">
              Crea una cuenta nueva!
            </p>
            <div className="flex flex-col p-1 mt-1 ml-3 md:ml-0">
              <label className="text-xs text-gray-300">Nombre</label>
              <Field
                name="nombre"
                placeholder="Ingresa tu nombre"
                className={
                  "text-gray-500 w-full outline-none focus:outline-none rounded-sm px-2 text-xs py-1 mt-2" +
                  (errors.nombre && touched.nombre
                    ? " border-red-500"
                    : " border-gray-300")
                }
              />
            </div>
            {errors.nombre && (
              <ErrorMessage
                name="nombre"
                component="span"
                className="text-red-400 font-small"
              />
            )}
            <div className="flex flex-col p-1 mt-1  ml-3 md:ml-0">
              <label className="text-xs text-gray-300">Apellido</label>
              <Field
                name="apellido"
                placeholder="Ingresa tu apellido"
                className={
                  "text-gray-500 w-full outline-none focus:outline-none rounded-sm px-2 text-xs py-1 mt-2" +
                  (errors.apellido && touched.apellido
                    ? " border-red-500"
                    : " border-gray-300")
                }
              />
            </div>
            {errors.apellido && (
              <ErrorMessage
                name="apellido"
                component="span"
                className="text-red-400 font-small"
              />
            )}
            <div className="flex flex-col p-1 mt-1 ml-3 md:ml-0">
              <label className="text-xs text-gray-300">Codigo de acceso</label>
              <div className="flex mt-1">
                <button
                  type="button"
                  onClick={setCode}
                  className="p-1 text-sm rounded px-4 bg-green-400 text-white"
                >
                  Generar
                </button>
                <input
                  ref={inputCode}
                  readOnly
                  defaultValue={codeVal.value}
                  placeholder="Genera tu codigo"
                  className="text-gray-500 w-full ml-2 outline-none focus:outline-none rounded-sm px-2 text-xs py-1"
                />
              </div>
            </div>
            <span className="text-red-400 text-xs">
              {codeVal.message !== "" ? codeVal.message : ""}
            </span>
            <div className="flex flex-col p-1 mt-1 ml-3 md:ml-0">
              <label className="text-xs text-gray-300">Password</label>
              <Field
                type="password"
                name="password"
                placeholder="Ingresa tu contraseña"
                className={
                  "text-gray-500 w-full outline-none focus:outline-none rounded-sm px-2 text-xs py-1 mt-2" +
                  (errors.password && touched.password
                    ? " border-red-500"
                    : " border-gray-300")
                }
              />
            </div>
            {errors.password && (
              <ErrorMessage
                name="password"
                component="span"
                className="text-red-400 font-small"
              />
            )}
            <div className="flex flex-col p-1 mt-1 ml-3 md:ml-0">
              <label className="text-xs text-gray-300">Repeat Password</label>
              <Field
                type="password"
                name="repeatPassword"
                placeholder="Repite tu contraseña"
                className={
                  "text-gray-500 w-full outline-none focus:outline-none rounded-sm px-2 text-xs py-1 mt-2" +
                  (errors.repeatPassword && touched.repeatPassword
                    ? " border-red-500"
                    : " border-gray-300")
                }
              />
            </div>
            {errors.repeatPassword && (
              <ErrorMessage
                name="repeatPassword"
                component="span"
                className="text-red-400 font-small"
              />
            )}
            <button
              type="submit"
              className="md:mt-6 mt-2  ml-2 md:ml-0 md:w-6/12 w-full login-button rounded-md text-sm md:text-md p-1 font-semibold text-white"
            >
              Registrar
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Register;

function defaultValues() {
  return {
    nombre: "",
    apellido: "",
    code: "",
    password: "",
    repeatPassword: "",
  };
}
