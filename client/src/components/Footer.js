import getConfig from "../utils/config";
import "bootstrap/dist/css/bootstrap.min.css";
import { PaginationControl } from "react-bootstrap-pagination-control";
import { useState } from "react";

const Footer = ({ currentPage, setCurrentPage }) => {
  const [page, setPage] = useState(1);
  return (
    <div>
      <PaginationControl
        page={currentPage}
        between={4}
        total={250}
        limit={20}
        changePage={(page) => {
          setCurrentPage(page);
          console.log(page);
        }}
        ellipsis={1}
      />
    </div>
  );
};

export default Footer;
