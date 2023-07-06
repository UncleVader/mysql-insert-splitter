# mysql-insert-splitter
**Description**: mysql-insert-splitter is a NodeJS tool that enables efficient splitting of large sql dump files with one big INSERT function into separated INSERTs per each VALUES argument. It provides a simple and flexible way to process sql files, using a stream-based approach for reading and writing, which helps optimize memory usage and improve performance.

**Features**:
- The tool and this description was written in collaboration with ChatGPT, original chat [here](https://chat.openai.com/share/a1d67476-2701-46f9-9165-575466b7a19f)
- Stream-based processing: the tool utilizes streams to read and write text files, enabling efficient handling of large files without loading the entire contents into memory.
- Automatic file listing: mysql-insert-splitter includes a functionality to automatically list all sql files in a specified folder and apply the splitting process to each file.
- Time processing logs: Each processed file is accompanied by a timestamp indicating the elapsed time taken to split the file, formatted in hours, minutes, and seconds.
- Straightforward integration: mysql-insert-splitter can be easily integrated into existing JavaScript projects, making it a versatile tool for various text file manipulation tasks.

With mysql-insert-splitter, you can efficiently handle large sql dump files by splitting one big INSERT into a separated INSERTs, improving performance and memory utilization.
