import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import FileUpload from '../../components/FileUpload/FileUpload';

const createMockFile = (name, size, type) => {
  const file = new File(['a'.repeat(size)], name, { type });
  Object.defineProperty(file, 'size', { value: size });
  return file;
};

describe('FileUpload Component', () => {
  const defaultProps = {
    allowedFormats: ['text/csv', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
    maxFileSizeMB: 2,
    label: 'Upload Your File',
    onFileSelect: jest.fn(),
    onInvalidFile: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the file upload component with label', () => {
    render(<FileUpload {...defaultProps} />);
    expect(screen.getByText('Upload Your File')).toBeInTheDocument();
  });

  it('calls onFileSelect when a valid file is selected', async () => {
    render(<FileUpload {...defaultProps} />);
    const input = screen.getByLabelText(/upload your file/i);

    const validFile = createMockFile('test.csv', 1024, 'text/csv');
    fireEvent.change(input, { target: { files: [validFile] } });

    await waitFor(() => {
      expect(defaultProps.onFileSelect).toHaveBeenCalledWith(validFile);
    });
  });

  it('calls onInvalidFile for an invalid format', async () => {
    render(<FileUpload {...defaultProps} />);
    const input = screen.getByLabelText(/upload your file/i);

    const invalidFile = createMockFile('test.txt', 1024, 'text/plain');
    fireEvent.change(input, { target: { files: [invalidFile] } });

    await waitFor(() => {
      expect(defaultProps.onInvalidFile).toHaveBeenCalled();
    });
  });

  it('calls onInvalidFile for a large file', async () => {
    render(<FileUpload {...defaultProps} />);
    const input = screen.getByLabelText(/upload your file/i);

    const largeFile = createMockFile('large.csv', 3 * 1024 * 1024, 'text/csv'); // 3MB
    fireEvent.change(input, { target: { files: [largeFile] } });

    await waitFor(() => {
      expect(defaultProps.onInvalidFile).toHaveBeenCalled();
    });
  });

  it('displays uploaded file name', () => {
    const file = createMockFile('uploaded.csv', 1024, 'text/csv');
    render(<FileUpload {...defaultProps} file={file} />);
    expect(screen.getByText(/uploaded.csv/)).toBeInTheDocument();
  });

  it('displays uploaded file list in multiple mode', () => {
    const files = [
      createMockFile('file1.csv', 1024, 'text/csv'),
      createMockFile('file2.csv', 1024, 'text/csv'),
    ];
    render(<FileUpload {...defaultProps} multiple={true} files={files} />);
    expect(screen.getByText(/file1.csv/)).toBeInTheDocument();
    expect(screen.getByText(/file2.csv/)).toBeInTheDocument();
  });
});
