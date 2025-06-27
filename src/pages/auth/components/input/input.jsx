import styled from 'styled-components';

const InputContainer = ({ className, id, label, register, ...props }) => {
  return (
    <div className={className}>
      <label htmlFor={id}>{label}</label>
      <input id={id} {...register} {...props} />
    </div>
  );
};

export const Input = styled(InputContainer)`
  margin-bottom: 1rem;
  text-align: left;

  & label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
  }

  & input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 1rem;
  }
`;
