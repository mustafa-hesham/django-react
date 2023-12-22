import Header from 'Component/Header';
import { PureComponent } from 'react';

class HomePageComponent extends PureComponent {
  render() {
    return (
      <div className='HomePage'>
        <Header />
        <h1>Home</h1>
      </div>
    );
  }
}

export default HomePageComponent;
