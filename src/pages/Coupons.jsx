import { useEffect, useState } from "react";
import Modal from "../components/global/modal/Modal";
import Layout from "../layout/Layout";
import Form from "../components/coupon/Form";
import { CouponService } from "../services/coupon.service";
import Pagination from "../components/global/Pagination";
import Table from "../components/coupon/Table";

const Coupons = ({ setShowModal, showModal }) => {
  const [coupons, setCoupons] = useState();
  const couponService = new CouponService();
  const [rangePag, setRangePag] = useState(null);
  const [reload, setReload] = useState(false);
  const [pagination, setPagination] = useState({
    nextPage: 0,
    prevPage: 0,
    currentPage: 0,
    totalPages: 0,
  });
  const range = (start, end, length = end - start + 1) => {
    setRangePag(Array.from({ length }, (_, i) => start + i));
  };
  const getPaginatedCoupons = (page = 1) => {
    couponService.getCoupons(page).then((res) => {
      setCoupons(res.cupones);
      setPagination({
        nextPage: res.nextPage,
        prevPage: res.prevPage,
        currentPage: res.currentPage,
        totalPages: res.totalPages,
      });
      range(1, res.totalPages);
    });
  };
  const ExpiredCupon = () => {
    coupons &&
      coupons.map((cp) => {
        if (new Date(cp.fechaExp) < Date.now() && cp.status === true) {
          const query = { id: cp.id };
          couponService.changeStatus(query).then((res) => {
            if (res.ok) {
              setReload(true);
            }
          });
        }
        return cp;
      });
  };
  useEffect(() => {
    return ExpiredCupon();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coupons]);
  useEffect(() => {
    setReload(false);
    return getPaginatedCoupons(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);
  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div>
            <h2 className="text-2xl font-semibold leading-tight">
              Listado de cupones
            </h2>
            <button
              onClick={() => setShowModal(!showModal)}
              className="bg-global p-2 w-28 text-center text-semibold float-right text-white rounded-md font-semibold text-xs mr-8"
            >
              Agregar
            </button>
            <Modal
              setShowModal={setShowModal}
              showModal={showModal}
              title="Agregar nuevo cupon"
            >
              <Form setShowModal={setShowModal} setReload={setReload} />
            </Modal>
          </div>
          <Table coupons={coupons} setReload={setReload} />
          {pagination.totalPages && pagination.totalPages > 1 && (
            <Pagination
              method={getPaginatedCoupons}
              pagination={pagination}
              rangePag={rangePag}
            />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Coupons;
