// =========================================================================
// File: OpticalFrameCard.jsx (Mastering Styled Components & Dynamic Props)
// =========================================================================
import React from 'react';
import styled from 'styled-components';

// 1. Creating a styled container component with standard CSS syntax inside backticks:
const CardContainer = styled.div`
  background-color: #0f172a;
  border: 2px solid ${props => props.isPremium ? '#f59e0b' : '#334155'};
  border-radius: 16px;
  padding: 24px;
  max-w: 350px;
  font-family: monospace;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.5);
  transition: transform 0.2s ease, border-color 0.2s ease;

  /* Dynamic hover effect based on the prop! */
  &:hover {
    transform: translateY(-6px);
    border-color: ${props => props.isPremium ? '#fbbf24' : '#3b82f6'};
  }
`;

const FrameTitle = styled.h3`
  color: #f8fafc;
  font-size: 1.25rem;
  font-weight: bold;
  margin: 0 0 8px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FrameSpecs = styled.p`
  color: #94a3b8;
  font-size: 0.85rem;
  margin: 0 0 16px 0;
`;

// 2. A dynamically styled badge: Background and Text color change based on 'inStock' prop!
const StockBadge = styled.span`
  padding: 4px 12px;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: bold;
  text-transform: uppercase;
  
  /* Dynamic CSS logic executed right inside the stylesheet! */
  background-color: ${props => props.inStock ? 'rgba(6, 95, 70, 0.4)' : 'rgba(153, 27, 27, 0.4)'};
  color: ${props => props.inStock ? '#34d399' : '#f87171'};
  border: 1px solid ${props => props.inStock ? '#059669' : '#dc2626'};
`;

const PriceTag = styled.div`
  font-size: 1.5rem;
  font-weight: 800;
  color: ${props => props.isPremium ? '#f59e0b' : '#38bdf8'};
  margin-top: 16px;
  border-top: 1px solid #1e293b;
  padding-top: 16px;
`;

// 3. The React Component: Zero className clutters, purely semantic custom tags!
const OpticalFrameCard = ({ modelName, material, price, inStock, isPremium }) => {
  return (
    // Passing JS props directly into the styled components:
    <CardContainer isPremium={isPremium}>
      
      <FrameTitle>
        <span>🕶️ {modelName}</span>
        {isPremium && <span style={{ fontSize: '0.8rem' }}>⭐ PRO</span>}
      </FrameTitle>
      
      <FrameSpecs>Material: {material}</FrameSpecs>
      
      {/* The badge styling adapts automatically to the inStock boolean */}
      <StockBadge inStock={inStock}>
        {inStock ? "Available in Clinic" : "Out of Stock"}
      </StockBadge>

      <PriceTag isPremium={isPremium}>
        ${price}
      </PriceTag>

    </CardContainer>
  );
};

export default OpticalFrameCard;