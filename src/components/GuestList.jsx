import { useEffect, useState } from "react";
import api from "../api/axios";

function GuestList({ refresh }) {
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const loadGuests = async () => {
    try {
      const res = await api.get("/guests");
      setGuests(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGuests();
  }, [refresh]);

  const getLink = (code) => `${window.location.origin}/invite/${code}`;

  const handleCopy = (code) => {
    navigator.clipboard.writeText(getLink(code));
  };

  const getWhatsappUrl = (guest) =>
    `https://wa.me/?text=${encodeURIComponent(
      `Assalamu Alaikum ${guest.name}, you are invited to our Nikah ceremony. Please open your invitation: ${getLink(guest.code)}`
    )}`;

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this guest?")) return;
    await api.delete(`/guests/${id}`);
    loadGuests();
  };

  if (loading) return <p className="mt-4">Loading guests...</p>;

  const openedCount = guests.filter((g) => g.opened).length;

  const visibleGuests = guests.filter((g) => {
    const matchesName = g.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      filter === "all" ||
      (filter === "opened" && g.opened) ||
      (filter === "notOpened" && !g.opened);
    return matchesName && matchesFilter;
  });

  return (
    <div className="mt-5">
      <h5>
        Guests ({guests.length}) - Opened: {openedCount}
      </h5>

      <input
        className="form-control mb-2"
        placeholder="Search guest name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="d-flex gap-2 mb-3">
        {[
          ["all", "All"],
          ["opened", "Opened"],
          ["notOpened", "Not opened"],
        ].map(([value, label]) => (
          <button
            key={value}
            className={`btn btn-sm ${
              filter === value ? "btn-dark" : "btn-outline-dark"
            }`}
            onClick={() => setFilter(value)}
          >
            {label}
          </button>
        ))}
      </div>

      {visibleGuests.length === 0 && (
        <p className="text-muted">No guests found.</p>
      )}

      {visibleGuests.map((guest) => (
        <div key={guest._id} className="card p-3 mb-2">
          <div className="d-flex justify-content-between">
            <div>
              <strong>{guest.name}</strong>
              {guest.withText && <div className="small">{guest.withText}</div>}
            </div>
            <span className={guest.opened ? "text-success" : "text-muted"}>
              {guest.opened ? "✅ Opened" : "⏳ Not opened"}
            </span>
          </div>

          <div className="d-flex gap-2 mt-2">
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={() => handleCopy(guest.code)}
            >
              Copy
            </button>
            <a
              className="btn btn-outline-success btn-sm"
              href={getWhatsappUrl(guest)}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={() => handleDelete(guest._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default GuestList;