# theartisonian.com — portfolio at /, newspaper at /newspaper/, bookclub at /bookclub/
# oyster stays on oyster.theartisonian.com (separate site block)

theartisonian.com {
	# Bookclub API + WS (browser uses /bookclub/... ; backend still sees /books, /ws, /docs)
	@bookclub_api path /bookclub/books* /bookclub/ws /bookclub/docs* /bookclub/redoc* /bookclub/openapi.json
	handle @bookclub_api {
		uri strip_prefix /bookclub
		reverse_proxy 127.0.0.1:8090
	}

	# Newspaper API + uploads + WS + docs (stay at domain root)
	@news_api path /stories* /health* /health/* /uploads* /ws /docs* /openapi.json
	handle @news_api {
		reverse_proxy 127.0.0.1:8080
	}

	redir /bookclub /bookclub/ 308
	redir /newspaper /newspaper/ 308

	# Bookclub React build (Vite base /bookclub/)
	handle_path /bookclub/* {
		root * /var/www/theartisonian/bookclub-build
		try_files {path} /index.html
		file_server
	}

	# Newspaper React build (Vite base /newspaper/)
	handle_path /newspaper/* {
		root * /var/www/theartisonian/newspaper-build
		try_files {path} /index.html
		file_server
	}

	# Portfolio landing page at /
	handle {
		root * /var/www/theartisonian/Portfolio
		try_files {path} /index.html
		file_server
	}
}

# Keep your existing oyster.theartisonian.com { ... } block below this.
