import React from 'react'
import CommunityCard from "../components/CommunityCard"

function Community() {
    return (
        <div style={{
            display: "flex",
            gap: "20px",
            alignItems: "center",
            justifyContent: "spaceBetween",
            flexWrap: "wrap",
        }}>
            <CommunityCard />
            <CommunityCard />
            <CommunityCard />
            <CommunityCard />
        </div>
    )
}

export default Community