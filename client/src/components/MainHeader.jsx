import { Toolbar } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import t from "../utils/translations";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormLabel from "@material-ui/core/FormLabel";
import { direction } from "../utils/enums";
import "./mainHeader.css";

const MainHeader = ({
  filterByStatus,
  setFilterByStatus,
  sortByDate,
  setSortByDate,
  typeOfResultsFromServer,
  setTypeOfResultsFromServer,
  autoComplite,
  setAutoComplite,
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
      <div id="server-filter">
        <FormLabel id="demo-radio-buttons-group-label">
          {t("getFromServer")}
        </FormLabel>
        <RadioGroup
          onChange={(e) => {
            setTypeOfResultsFromServer(e.target.value);
          }}
          value={typeOfResultsFromServer}
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="all"
          name="radio-buttons-group"
        >
          <FormControlLabel
            value="Results"
            control={<Radio />}
            label="Results"
          />
          <FormControlLabel value="Wins" control={<Radio />} label="Wins" />
          <FormControlLabel
            value="Withdraw"
            control={<Radio />}
            label="Withdraw"
          />
          <FormControlLabel value="all" control={<Radio />} label="all" />
        </RadioGroup>
      </div>
      <div>
        <InputLabel>{t("bonusQuesitionFastSearch")}</InputLabel>
        <input
          value={autoComplite}
          onChange={(e) => setAutoComplite(e.target.value)}
          type="text"
        />
      </div>
    </Toolbar>
  );
};

export default MainHeader;
