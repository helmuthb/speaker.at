import { Controller } from 'cerebral';
import { set } from 'cerebral/operators';
import { state, string } from 'cerebral/tags';
import AppModule from './AppModule';

const AppController = Controller(AppModule);

export default AppController;
