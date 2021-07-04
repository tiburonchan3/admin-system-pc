import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CouponService } from "../../services/coupon.service";
import { toast } from "react-toastify";

const Form = ({ user,setShowModal }) => {
  const couponService = new CouponService();
  const formik = useFormik({
    initialValues: defaultValues(user),
    validationSchema: Yup.object({
      email: Yup.string()
        .required("El email es requerido")
        .email("Email invalido"),
      cupon: Yup.string().required("El cupon es requerido"),
    }),
    onSubmit: (values) => {
      couponService.shareCoupon(values).then((res) => {
        if (!res.ok) {
          toast.error(res.message);
          setShowModal(false)
          return;
        }
        toast.success(res.message);
        setShowModal(false)
      });
    },
  });
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col">
          <label className="text-gray-500 text-sm">Email</label>
          <div className="flex">
            <input
              name="email"
              onChange={formik.handleChange}
              placeholder="Ingresa el email"
              className={
                "w-80 border p-1 px-4 text-sm rounded border-r-0 focus:outline-none focus:border" +
                (formik.errors.email && formik.touched.email
                  ? "border-red-400"
                  : "border-gray-300")
              }
              defaultValue={formik.values.email}
            />
          </div>
          {formik.errors.email && (
            <span className="text-red-400 text-sm mt-1">
              {formik.errors.email}
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-gray-500 text-sm">Cupon</label>
          <input
            type="text"
            name="cupon"
            onChange={formik.handleChange}
            placeholder="Ingresa el cupon"
            className={
              "w-80 border p-1 px-4 text-sm rounded border-r-0 focus:outline-none focus:border" +
              (formik.errors.cupon && formik.touched.cupon
                ? "border-red-400"
                : "border-gray-300")
            }
          />
          {formik.errors.cupon && (
            <span className="text-red-400 text-sm mt-1">
              {formik.errors.cupon}
            </span>
          )}
        </div>
        <button
          type="submit"
          className="mt-3 w-full bg-global py-1 text-sm text-white rounded"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

export default Form;
function defaultValues(user) {
  return {
    email: user.email,
    cupon: "",
  };
}
