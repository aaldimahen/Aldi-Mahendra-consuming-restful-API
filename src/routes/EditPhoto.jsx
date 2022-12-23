import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditPhoto = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [captions, setCaptions] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetch('http://localhost:3001/photos/'+id)
      .then((res) => res.json())
      .then((json) => {
        setCaptions(json.captions)
        setImageUrl(json.imageUrl);
        setLoading(false);
      }
      )
    }, [id]);

  const editPhoto = async (e) => {
    const url = "http://localhost:3001/photos/"
    e.preventDefault();
    const changePhotos={
      'imageUrl':imageUrl,
      'captions':captions,
      'updatedAt': new Date(),
    }
    try{
      const res = await fetch(url+id,{
        method : 'PATCH',
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(changePhotos),
      })
      const dataPhotos = await res.json()
      console.log(dataPhotos)
    } catch(error){
      setError(error)
    }
    navigate("/photos")
  };


  if (error) return <div>Error!</div>;

  return (
    <>
      {loading ? (
        <h1 style={{ width: "100%", textAlign: "center", marginTop: "20px" }}>
          Loading...
        </h1>
      ) : (
        <div className="container">
          <form className="edit-form" onSubmit={editPhoto}>
            <label>
              Image Url:
              <input
                className="edit-input"
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </label>
            <label>
              Captions:
              <input
                className="edit-input"
                type="text"
                value={captions}
                data-testid="captions"
                onChange={(e) => setCaptions(e.target.value)}
              />
            </label>
            <input className="submit-btn" type="submit" value="Submit" data-testid="submit" />
          </form>
        </div>
      )}
    </>
  );
};

export default EditPhoto;
