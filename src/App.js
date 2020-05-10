import React from 'react';
import { AppHeader, AppFooter } from 'components';
import { Container } from '@material-ui/core'
import AppRenderRoutes from 'global/AppRenderRoutes.module';
import 'global/global.css';
import TaskStore from 'context/TaskStore';

function App() {
  return (
    <div className="App">
      <TaskStore>
        <AppHeader />
        <Container style={{ marginBottom: '2em' }}>
          <AppRenderRoutes />
        </Container>
        <AppFooter />
      </TaskStore>
    </div>
  );
}

export default App;
