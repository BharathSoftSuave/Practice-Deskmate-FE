import React, { useEffect, useState } from "react";
import { Pagination } from "@mui/material";
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { getPopup } from "../../../service/loginService";
import AttributionIcon from "@mui/icons-material/Attribution";
import { Button } from "@mui/material";
import { allocateOrRevokeDesk } from "../../../service/loginService";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
interface WorkAreaProps {
  closePopup: () => void;
  choosenDesk : any
}

interface WorkAreaProps {
  closePopup: () => void;
}
const EmployeeList: React.FC<WorkAreaProps> = ({ closePopup, choosenDesk }) => {
  
  const handleCloseAll = async () => {
    const payload1 = {
      operation: "allocate",
      user_id: choosenemp,
      office_id: "67d59b0a8058c844cca6d9ac",
      desk_num: choosenDesk,
    };
    console.log("we go ", payload1);
    const response = await allocateOrRevokeDesk(payload1);
    
    if(response?.message){
      toast.success(response.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,   
      });
    }
    else{
      toast.error(response.detail, {
        style: {
          background: "white",
          color: "#141332;",
          borderRadius: "8px",
        },
        position: "top-right",
        autoClose: 3000, 
        closeOnClick: true,
        draggable: true,
      });
    }
    console.log(response, "  error");
    closeConfirmPopup();
    closePopup();
  };
  const [choosenemp, setChoosenemp] = useState();
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const openConfirmPopup = (c_emp: any) => {
    setChoosenemp(c_emp);
    setIsConfirmPopupOpen(true);
  };

  const closeConfirmPopup = () => {
    setIsConfirmPopupOpen(false);
  };
  // let totalPage=7;
  const [data, setData] = useState();
  const [totalPage,setTotalPage] =  useState();
  console.log("popup IN", data);
  const [page, setPage] = useState(1);
  const payload = {
    page: page,
    size: 10,
  };

  const [searchQuery, setSearchQuery] = useState("");

const filteredData = data?.filter((employee: any) =>
  employee.full_name.toLowerCase().includes(searchQuery.toLowerCase())
);

  useEffect(() => {

    console.log("get dashboard", choosenDesk);
    const fetech = async () => {
      const result = await getPopup(payload);
      setTotalPage(result.total_pages);
      setData(result.data);
     
      console.log("total page ",totalPage);
    };
    fetech();

    const handleOutsideClick = (event: MouseEvent) => {
      try {
      } catch (err) {}
      if ((event.target as HTMLElement).id === "popup-background") {
        closePopup();
      }
    };

    const newValue = Math.random().toString(36).substring(7); // Generate a random value
    localStorage.setItem("triggerEffect", newValue); // Store in localStorage
    window.dispatchEvent(new Event("storage"));

    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [page, closePopup]);
  return (
    <div
      className="flex items-center justify-center fixed top-0 left-0 w-full h-full z-20 
             before:content-[''] before:absolute before:w-full before:h-full before:blur-[50px] 
             before:bg-[rgb(29,29,65,50%)]"
            id="popup-background"
    >
      <div className="h-fit text-white shadow-lg rounded-2xl w-[500px] bg-[var(--primary)] border border-[#555597] m-auto relative">
        <div className="flex justify-between p-5">
          <h1 className="text-base font-medium">Desk Allocation</h1>
          <CloseRoundedIcon onClick={closePopup} />
        </div>
        <Divider orientation="horizontal" color="#7A7C7E" flexItem />
        <div className="flex flex-col gap-5 p-5">
          <div className="flex justify-between">
          </div>
          <div className="flex justify-between relative">
            <SearchRoundedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search Employees"
              className="w-full text-white rounded-md py-3 pl-12 px-5 focus:outline-none focus:ring-1 focus:ring-[#F85E00]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="h-[300px] overflow-y-auto scrollbar-hide">
            {filteredData?.map((employee: any) => (
              <div
                key={employee.id}
                className="flex justify-between bg-[var(--secondary)] px-4 mb-2 rounded-2xl border border-[#30306D] hover:bg-[var(--primary)] hover:border-[#524fa5] cursor-pointer"
                onClick={() => openConfirmPopup(employee.id)}
              >
                <List>
                  <ListItem alignItems="flex-start" className="!p-0 !m-0">
                    <ListItemAvatar>
                      <Avatar
                        alt={employee.full_name}
                        src={employee.avatar || "/static/images/avatar/1.jpg"}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={employee.full_name}
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            sx={{ color: "#7A7C7E", display: "inline" }}
                          >
                            {employee.designation}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                </List>
              </div>
            ))}
          </div>

          <div className="p-5">
            <Pagination
              count={totalPage}
              page={page}
              onChange={(_, value) => setPage(value)}
              shape="rounded"
              variant="outlined"
              sx={{
                backgroundColor: "#1D1D41", // Background color
                padding: "8px",
                borderRadius: "8px",
                "& .MuiPaginationItem-root": {
                  color: "white", // Text color of page numbers
                },
                "& .Mui-selected": {
                  backgroundColor: "#141332 !important", // Active page background
                  color: "white !important", // Active page text color
                  borderColor: "purple !important",
                },
              }}
            />
          </div>
        </div>
      </div>
      {isConfirmPopupOpen && (
        <div className="h-screen w-full flex items-center absolute left-0 top-0 before:content-[''] before:absolute before:w-full before:h-full before:blur-lg bg-blend-color-burn before:bg-[rgb(29,29,65,80%)] z-10">
          <div className="h-fit text-white shadow-lg rounded-2xl w-[500px] bg-[var(--primary)] border border-[#30306D] m-auto relative">
            <div className="flex justify-between p-5">
              <h1 className="text-base font-medium">Confirm Assign Employee</h1>

              <div
                className="cursor-pointer"
                onClick={() => closeConfirmPopup()}
              >
                <CloseRoundedIcon />
              </div>
            </div>
            <hr
              className="MuiDivider-root MuiDivider-fullWidth MuiDivider-flexItem css-lhgpb-MuiDivider-root"
              color="#7A7C7E"
            ></hr>
            <div className="flex flex-col items-center gap-5 p-5">
              <AttributionIcon style={{ width: "50px", height: "50px" }} />
              <p className="text-sm font-normal">
                Are you sure want to assign this employee in this desk no - #114
              </p>
              <div className="flex gap-2">
                <Button variant="outlined" onClick={() => closeConfirmPopup()}>
                  Reassign
                </Button>
                <Button variant="contained" onClick={handleCloseAll}>
                  Confirm
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
