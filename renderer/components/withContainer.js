import App from 'next/app'
// withContainer.js
function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
  }
export default Component => {
  return class WithContainer extends React.Component {
    static getInitialProps = Component.getInitialProps;
    
    static displayName = `WithContainer(${getDisplayName(App)})`;
    render() {
      return (
        <Container>
          <Component {...this.props} />
        </Container>
      );
    }
  };
}
  