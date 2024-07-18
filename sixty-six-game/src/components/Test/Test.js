import { test } from '../../services/services'
import { displaySuccess, displayError } from '../Notify/Notify'

const Test = () => {
  const handleSubmit = async (e) => {
    try {
      const response = await test();
      const data = await response.json();
      if (data) {
        displaySuccess('Created!');
      } else {
        displayError('Failed');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button type="submit" onClick={handleSubmit}>Test</button>
    </div>
  );
};

export default Test;