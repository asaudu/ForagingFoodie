import { useState } from "react";
import DallasForm from "../components/DallasForm";
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
        <br />

        <button onClick={() => setSelected(null)}>Go Back</button>
      </div>
    );
  } else {
    switchDisplayView = (
      <div>
        <DallasForm />
        <DallasPostList passingSelected={passingSelected} />
      </div>
    );
  }

  return <div>{switchDisplayView}</div>;
};

export default Dallas;
