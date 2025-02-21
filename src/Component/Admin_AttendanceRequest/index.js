import React, { useState, useMemo } from 'react';
import './index.css';
import { FaGear } from 'react-icons/fa6';

const initialDeals = [
  { id: 'EMP001', name: 'John Smith', description: 'Frontend Development', date: '22 Dec 2022', status: 'Late', reject: false },
  { id: 'EMP002', name: 'Sarah Johnson', description: 'Backend Development', date: '21 Dec 2022', status: 'Late', reject: false },
  { id: 'EMP003', name: 'Mike Wilson', description: 'UI/UX Design', date: '18 Dec 2022', status: 'Late', reject: false },
  { id: 'EMP004', name: 'Emily Brown', description: 'DevOps Engineering', date: '14 Dec 2022', status: 'Late', reject: false },
  { id: 'EMP007', name: 'James Wilson', description: 'Quality Assurance', date: '11 Dec 2022', status: 'Late', reject: false },
  { id: 'EMP008', name: 'Maria Garcia', description: 'Mobile Development', date: '10 Dec 2022', status: 'Late', reject: false }
];

function AdminAttendenceReqp() {
  const [deals, setDeals] = useState(initialDeals);
  const [sortConfig, setSortConfig] = useState(null);
  const [popup, setPopup] = useState({ visible: false, id: null });

  const sortedDeals = useMemo(() => {
    if (!sortConfig) return deals;
    return [...deals].sort((a, b) =>
      a[sortConfig.key] < b[sortConfig.key]
        ? sortConfig.direction === 'asc' ? -1 : 1
        : a[sortConfig.key] > b[sortConfig.key]
        ? sortConfig.direction === 'asc' ? 1 : -1
        : 0
    );
  }, [deals, sortConfig]);

  const handleSort = (key) => {
    setSortConfig((currentSort) =>
      currentSort?.key === key
        ? { key, direction: currentSort.direction === 'asc' ? 'desc' : 'asc' }
        : { key, direction: 'asc' }
    );
  };

  const handlePopup = (id) => {
    setPopup({ visible: true, id });
  };

  const closePopup = () => {
    setPopup({ visible: false, id: null });
  };

  return (
    <div className="container">
                    <div className="ribbon-box-attendance-request-admin">
                        <div className="ribbon-box-attendance-request-admin ribbon-info float-left">Attendance Request</div>
                    </div>
      <div className="table-container-attendance-req">
        <table>
          <thead>
            <tr>
              {['ACTION','EMP ID', 'NAME', 'DATE','DESCRIPTION','STATUS'].map((header) => (
                <th key={header} onClick={() => handleSort(header.toLowerCase())}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedDeals.map((deal) => (
              <tr key={deal.id}>
                <td>
                  <button className="action-button" onClick={() => handlePopup(deal.id)}>
                    <FaGear/>
                  </button>
                </td>
                <td>{deal.id}</td>
                <td>{deal.name}</td>
                <td>{deal.date}</td>
                <td>{deal.description}</td>
                <td className={`status ${deal.status.toLowerCase()}`}>{deal.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {popup.visible && (
        <div className="popup-overlay">
          <div className="popup">
            <p className='popup-content '>Accept or Reject Request for {popup.id}?</p>
            <button className="accept" onClick={closePopup}>Accept</button>
            <button className="reject" onClick={closePopup}>Reject</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminAttendenceReqp;