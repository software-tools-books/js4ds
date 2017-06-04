const TitledField = ({label, value, onChange}) => {
  return (
    <p>
      {label}: <input type="text" value={value} onChange={(event) => onChange(event.target.value)} />
    </p>
  )
}
