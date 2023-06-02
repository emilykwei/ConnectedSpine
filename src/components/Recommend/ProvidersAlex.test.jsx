import { describe, expect, test } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import Providers from './Providers';
// import AssessmentContext from '../helpers/Contexts';
// import { useDbData } from './utilities/firebase';
import AssessmentContext from '../../helpers/Contexts';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { ResultDetails } from '../../helpers/RecommendedDetails';
vi.mock('./utilities/firebase');

const firebaseConfig = {
  apiKey: 'AIzaSyDPOkyUz5CWBVtnnEbCiXHigIbsRggAVxQ',
  authDomain: 'connectedspine-6185c.firebaseapp.com',
  projectId: 'connectedspine-6185c',
  storageBucket: 'connectedspine-6185c.appspot.com',
  messagingSenderId: '1007989386438',
  appId: '1:1007989386438:web:ae244de67f858f182efbc7',
  measurementId: 'G-HWSQ69B24Y',
};

// Initialize Firebase app with configuration
initializeApp(firebaseConfig);

describe('Providers component', () => {
  test('Providers component renders and displays proper text, should pass', () => {
    // Commenting out lines of code from Providers.jsx causes the test to fail
    // so, the test fails with broken code
    vi.mock('firebase/auth', () => {
      return {
        getAuth: () => {
          return {
            currentUser: {
              email: 'test@gmail.com',
              uid: '2mGyJ26Lddb8XLknxp0K8q2pVqa2',
            },
          };
        },
      };
    });
    const mockResultIndex = [0, 1]; // Mocked value for resultIndex
    const mockData = {
      '2mGyJ26Lddb8XLknxp0K8q2pVqa2': {
        email: 'test@gmail.com',
        results: ['result1', 'result2'], // Mocked value for data
      },
    };
    // useDbData.mockReturnValue([mockData, false, null]);
    render(<Providers resultIndex={mockResultIndex} data={mockData} />);
    expect(screen.getByText('Results')).toBeDefined();
    expect(
      screen.getByText('Your answers suggest that your symptoms are related to')
    ).toBeDefined();
    expect(screen.getByText('Recommended providers')).toBeDefined();
  });
});
