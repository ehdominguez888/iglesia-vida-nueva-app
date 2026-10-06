// ... existing code ...

{showDropdown && (
  <div 
    className="absolute left-0 top-full z-[100] mt-2 w-80 rounded-2xl border border-border bg-card p-4 shadow-lg"
    style={{ 
      backgroundColor: 'hsl(var(--card))',
      borderColor: 'hsl(var(--border))',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)'
    }}
  >
    {/* ... rest of the dropdown content ... */}
  </div>
)}

// ... existing code ...