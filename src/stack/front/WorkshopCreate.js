import TitledField from './TitledField'

const WorkshopCreate = ({name, onEditName, duration, onEditDuration, onSubmit}) => {
  return (
    <div>
      <TitledField label="name" value={name} onChange={onEditName} />
      <TitledField label="duration" value={duration} onChange={onEditDuration} />
      <button onClick={(event) => onSubmit(name, duration)}>new</button>
    </div>
  )
}

export default WorkshopCreate
