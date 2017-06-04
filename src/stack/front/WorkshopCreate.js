const WorkshopCreate = ({name, onEditName, duration, onEditDuration, onSubmit}) => {
  return (
    <p>
      <TitledField label="name" value={name} onChange={onEditName} />
      <TitledField label="duration" value={duration} onChange={onEditDuration} />
      <button onClick={(event) => onSubmit(name, duration)}>new</button>
    </p>
  )
}
