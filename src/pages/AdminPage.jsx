import { useState } from "react";
import api from "../api/axios";
import GuestList from "../components/GuestList"; // change 1: import

function AdminPage() {
  const [name, setName] = useState("");
  const [withText, setWithText] = useState("");
  const [link, setLink] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [refresh, setRefresh] = useState(0); // change 2: new state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/guests", { name, withText });
      setLink(res.data.link);
      setRefresh((r) => r + 1); // change 3: tell the list to reload
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
    `Assalamu Alaikum ${name}, you are invited to our Nikah ceremony. Please open your invitation: ${link}`
  )}`;

  return (
    <div className="container py-5" style={{ maxWidth: 480 }}>
      <h2 className="text-center mb-4">Create Invitation</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Guest name</label>
          <input
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ahmed Khan"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Second line (optional)</label>
          <input
            className="form-control"
            value={withText}
            onChange={(e) => setWithText(e.target.value)}
            placeholder="With Family"
          />

          <div className="d-flex gap-2 mt-2 flex-wrap">
            {["With Family", "& Family", "With Spouse"].map((text) => (
              <button
                type="button"
                key={text}
                className="btn btn-outline-secondary btn-sm"
                onClick={() => setWithText(text)}
              >
                {text}
              </button>
            ))}
          </div>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <button className="btn btn-success w-100" disabled={loading}>
          {loading ? "Creating..." : "Create Link"}
        </button>
      </form>

      {link && (
        <div className="card p-3 mt-4">
          <p className="mb-2 text-break">{link}</p>
          <div className="d-flex gap-2">
            <button className="btn btn-primary flex-fill" onClick={handleCopy}>
              {copied ? "Copied!" : "Copy Link"}
            </button>
            <a
              className="btn btn-success flex-fill"
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>
          </div>
        </div>
      )}

      <GuestList refresh={refresh} /> {/* change 4: the list, at the bottom */}
    </div>
  );
}

export default AdminPage;