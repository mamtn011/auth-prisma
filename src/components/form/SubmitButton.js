import { Button } from "@/components/ui/button";
const SubmitButton = ({ label, disabled }) => {
  return (
    <div className="mt-5">
      <Button type="submit" className="w-full capitalize" disabled={disabled}>
        {label}
      </Button>
    </div>
  );
};

export default SubmitButton;
