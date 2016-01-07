import sys
import os

application = None

base_dir = os.path.dirname(os.path.abspath(__file__))

interpreter = os.path.join(base_dir, 'env', 'bin', 'python')

if sys.executable != interpreter:
    os.execl(interpreter, interpreter, *sys.argv)
else:
    sys.path.append(os.getcwd())

    import logging
    from main.log_utils import init_logging
    from main.data_loader import load_data
    from main import create_app

    init_logging(logging.WARN)

    data_loaded = load_data()
    if data_loaded:
        application = create_app("dreamhost")
