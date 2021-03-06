import { useState } from "react";
import "./styles/login.styles.css";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { EmployeeService } from "../../services/employe.service";
import { toast } from "react-toastify";
import CheckPassword from "./CheckPassword";

const Login = ({ setRefreshCheckLogin }) => {
  const [existUser, setExistUser] = useState({
    exist: false,
    newUser: false,
    id: 0,
  });
  const [code, setCode] = useState();
  const emplService = new EmployeeService();
  const checkUser = (values) => {
    if (values.code !== "") {
      emplService.ifExist(values.code).then((res) => {
        if (res.ok) {
          setCode(values.code);
          if (res.newUser) {
            setExistUser({ exist: true, newUser: true, id: res.userId });
            return;
          }
          setExistUser({ exist: true, newUser: false, id: res.userId });
          return;
        }
        toast.warning("Codigo invalido");
      });
    }
  };
  return (
    <>
      <h1 className="text-gray-300 text-sm mt-16 md:text-md font-semibold uppercase md:mt-24 text-center md:ml-6">
        Ingresa tus datos e inicia sesion!!
      </h1>
      {existUser.exist ? (
        <CheckPassword setRefreshCheckLogin={setRefreshCheckLogin} code={code} existUser={existUser} />
      ) : (
        <div>
          <Formik
          initialValues={{ code: "", password: "", repeatPassword: "" }}
          validationSchema={Yup.object().shape({
            code: Yup.string().required("El codigo es requerido"),
          })}
          onSubmit={(code) => checkUser(code)}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="login-container grid w-80 p-8 mr-4 mt-6">
                <div className="flex flex-col justify-center ml-5 md:ml-0 content-center">
                  <label className="text-xs text-gray-300">
                    Codigo de acceso
                  </label>
                  <Field
                    name="code"
                    placeholder="Ingresa tu codigo de acceso"
                    className={
                      "text-gray-500 w-full outline-none focus:outline-none rounded-sm px-4 text-xs py-1 mt-2" +
                      (errors.code && touched.code
                        ? " border-red-500"
                        : " border-gray-300")
                    }
                  />
                  {errors.code && (
                    <ErrorMessage
                      name="code"
                      component="span"
                      className="text-red-400 font-small"
                    />
                  )}
                </div>
                <button
                  type="submit"
                  className="mt-10 ml-3 md:ml-0 w-full md:w-6/12 login-button rounded-md text-md p-1 font-semibold text-white"
                >
                  Verificar
                </button>
              </div>
            </Form>
          )}
        </Formik>        
        </div>
      )}
    </>
  );
};

export default Login;
