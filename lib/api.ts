import axios, { AxiosError } from 'axios';
import { getStoredUser } from './auth';

const API_BASE_URL = 'https://qh230etis0.execute-api.us-east-1.amazonaws.com/Prod/v1';

interface GenerateOTPResponse {
  message?: string;
}

interface VerifyOTPRequest {
  email: string;
  code: string;
}

interface VerifyOTPResponse {
  token: string;
}

interface UploadRequestResponse {
  signedUrl: string;
  userId: string;
  fileId: string;
}

interface Video {
  id: string;
  filename: string;
  timestamp: string;
  status: string;
  createdAt: string;
  fileSize: number;
  contentType: string;
}

interface ListVideosResponse {
  videos: Video[];
  nextToken?: string;
}

export const generateOTP = async (email: string): Promise<GenerateOTPResponse> => {
  try {
    const response = await axios.post<GenerateOTPResponse>(
      `${API_BASE_URL}/users/generate-otp`,
      { email }
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || 'Failed to generate OTP');
    }
    throw error;
  }
};

export const verifyOTP = async (email: string, code: string): Promise<VerifyOTPResponse> => {
  try {
    const response = await axios.post<VerifyOTPResponse>(
      `${API_BASE_URL}/users/verify-otp`,
      { email, code }
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || 'Failed to verify OTP');
    }
    throw error;
  }
};

export const getUploadUrl = async (filename: string, fileSize: number): Promise<UploadRequestResponse> => {
  try {
    const user = getStoredUser();
    if (!user) {
      throw new Error('User not authenticated');
    }

    const response = await axios.post<UploadRequestResponse>(
      `${API_BASE_URL}/videos/upload-request`,
      { filename, fileSize },
      {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || 'Failed to get upload URL');
    }
    throw error;
  }
};

export const uploadFile = async (file: File, signedUrl: string, userId: string, fileId: string): Promise<void> => {
  try {
    await axios.put(signedUrl, file, {
      headers: {
        'Content-Type': file.type,
        'x-amz-meta-file-owner-id': userId,
        'x-amz-meta-file-id': fileId
      },
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || 'Failed to upload file');
    }
    throw error;
  }
};

export const listVideos = async (nextToken?: string): Promise<ListVideosResponse> => {
  try {
    const user = getStoredUser();
    if (!user) {
      throw new Error('User not authenticated');
    }

    const params = new URLSearchParams();
    if (nextToken) {
      params.append('nextToken', nextToken);
    }

    const response = await axios.get<ListVideosResponse>(
      `${API_BASE_URL}/users/me/videos?${params.toString()}`,
      {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      }
    );
    return { videos: response.data.videos.map(v => ({...v, fileSize: isNaN(v.fileSize) ? 0 : Number(v.fileSize)})), nextToken: response.data.nextToken };
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || 'Failed to fetch videos');
    }
    throw error;
  }
}; 