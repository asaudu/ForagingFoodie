function IndividualPost(props) {
  const { post } = props;


  return (
    <div>
      <div className="cardDiv" style={{ margin: "auto", width: "40rem" }}>
        <h1 className="homePageTitle">Welcome to the Foraging Foodie</h1>
        <div className="card" style={{ width: "45rem" }}>
          <img
            className="card-img-top"
            className="rounded-circle"
            src={post.imageurl}
            alt="Card image cap"
            style={{ width: "600px", height: "500px", paddingTop: "5px" }}
          />
        </div>
        <div
          className="card-body"
          style={{
            backgroundColor: "#084b83",
            borderRadius: "4px",
            margin: "auto",
          }}
        >
          <h5 className="card-title">{post.dish}</h5>
          <p className="card-text-single">
            {post.restaurant} {post.display_address}
          </p>
          <p className="card-text-single">{post.content}</p>
        </div>
      </div>
    </div>
  );
}

export default IndividualPost;
