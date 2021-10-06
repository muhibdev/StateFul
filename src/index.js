/* Custom Dom  */
import StateFull from './StateFullDOM/StateFull';
import StateFullList from './StateFullDOM/StateFullList';

/* Global Dom */
import { C, CA, F, Q, QA } from './Utils/DOM';

/*  Hooks */
import useInput from './Hooks/useInput';

//
window.StateFull = StateFull;
window.StateFullList = StateFullList;
//
window.C = C;
window.CA = CA;
window.F = F;
window.Q = Q;
window.QA = QA;

//
window.useInput = useInput;

/* 
--------
*/
export { StateFull, StateFullList, C, CA, F, Q, QA, useInput };
