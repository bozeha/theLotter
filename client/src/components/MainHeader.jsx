import { Toolbar } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import t from "../utils/translations";
import Button from "@material-ui/core/Button";
import { direction } from "../utils/enums";
import "./mainHeader.css";

const MainHeader = ({
  filterByStatus,
  setFilterByStatus,
  sortByDate,
  setSortByDate,
}) => {
  return (
    <Toolbar id="main-header">
      <InputLabel id="demo-select-small-label">{`${t(
        "sortByStatus"
      )}:`}</InputLabel>
      <Select
        labelId="demo-select-small-label"
        value={filterByStatus}
        label={t("status")}
        onChange={(e) => {
          setFilterByStatus(e.target.value);
        }}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value="Active">{t("active")}</MenuItem>
        <MenuItem value="Done">{t("done")}</MenuItem>
      </Select>
      <Button
        className={
          sortByDate === direction.Asc
            ? "asc"
            : sortByDate === direction.Desc
            ? "desc"
            : "asc-desc"
        }
        onClick={() => {
          setSortByDate((prev) => {
            if (prev === direction.Asc) {
              return direction.Desc;
            } else {
              return direction.Asc;
            }
          });
          // changeStatus(todo.id);
        }}
        variant="contained"
        color="inherit"
      >
        {t("ascDesc")}
      </Button>
    </Toolbar>
  );
};

export default MainHeader;
