import Label from "components/Label";

export default function getNotification(number: number) {
  return (
    <Label variant="outlined" color="primary">
      {number}
    </Label>
  );
}
