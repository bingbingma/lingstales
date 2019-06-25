import React from "react";

export default function Comment(props) {
  const { author, text, date } = props.comment;
  console.log("[DEBUG] comment component", props.comment);
  return (
    <div className="media mb-3">
      <img
        className="mr-3 bg-light rounded"
        // width="48"
        // height="48"
        src={`https://api.adorable.io/avatars/48/${author}@adorable.io.png`}
        alt={author}
      />

      <div className="media-body p-2 shadow-sm rounded bg-light border">
        <small className="float-right text-muted">{date}</small>
        <h6 className="mt-0 mb-1 text-muted">{author}</h6>
        {text}
      </div>
    </div>
  );
}
