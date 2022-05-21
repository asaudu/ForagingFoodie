import { useState } from "react";
import Form from "../components/form";
import DallasPostList from "../components/DallasPostList";
import IndividualPost from "../components/IndividualPost";

const Dallas = () => {
  const [selected, setSelected] = useState(null);
  //const [posts, setPosts] = useState([]);

  function passingSelected(post) {
    //console.log('hello')
    setSelected(post);
    console.log("post dallas check", post);
  }

  let switchDisplayView;

  if (selected != null) {
    switchDisplayView = (
      <div>
        <IndividualPost post={selected} />

        <button
          style={{
            borderRadius: "8px",
            boxShadow: "0 2px #ff66b3",
            color: "#ff66b3",
          }}
          onClick={() => setSelected(null)}
        >
          Go Back
        </button>
      </div>
    );
  } else {
    switchDisplayView = (
      <div>
        <Form header={"Dallas Ventures Heeere"} location={"Dallas, TX"} />
        <DallasPostList passingSelected={passingSelected} />
      </div>
    );
  }

  return <div>{switchDisplayView}</div>;
};

export default Dallas;
