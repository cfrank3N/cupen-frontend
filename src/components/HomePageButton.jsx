import { Button } from "react-bootstrap";

function HomePageButton({ content }) {
  return (
    <Button variant="outline-warning" className="text-secondary">
      {content}
    </Button>
  );
}

export default HomePageButton;
