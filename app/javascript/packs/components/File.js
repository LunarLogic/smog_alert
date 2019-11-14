import React from "react";
import Button from "@material-ui/core/Button";

const File = () => {
    return (
        <div> 
            {true ? "Strona w budowie" : "Error"} 
            <Button variant="contained" color="primary">
                Test
            </Button>
        </div>);

};
export default File;
