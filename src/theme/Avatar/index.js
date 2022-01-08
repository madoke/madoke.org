import React from 'react';

function Avatar() {
  return (
    <div className="avatar">
      <img
        className="avatar__photo avatar__photo--xl"
        src="https://avatars.githubusercontent.com/u/185598?v=4"
      />
      <div className="avatar__intro">
        <div className="avatar__name" style={{ fontSize: '2em' }}>David Simão</div>
        <small className="avatar__subtitle">
          Software Engineer based in Lisbon with expertise in backend, databases and distributed systems</small>
      </div>
    </div>
  )
}

export default Avatar;
