import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export default function Buttons({ count }) {
  return (
    <Stack direction="row" spacing={2}>
      <Button variant="outlined" color="secondary">
        ALL ({count})
      </Button>
      <Button variant="outlined" color="success">
        ACTIVE
      </Button>
      <Button variant="outlined" color="error">
        INACTIVE
      </Button>
    </Stack>
  );
}
